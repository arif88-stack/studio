'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, doc } from 'firebase/firestore';
import { format } from 'date-fns';

import { useFirebase, useUser, useCollection, updateDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  weldingWorkType: string;
  length: number;
  width: number;
  height: number;
  status: 'Pending' | 'Received' | 'Processing' | 'Completed' | 'Cancelled';
  submissionDateTime: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const { firestore } = useFirebase();
  const { user, isUserLoading } = useUser();

  const ordersCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'orders');
  }, [firestore]);
  
  const { data: orders, isLoading: isLoadingOrders } = useCollection<Order>(ordersCollection);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/admin/login');
    }
  }, [user, isUserLoading, router]);

  const handleRejectOrder = (orderId: string) => {
    if (!firestore) return;
    const orderRef = doc(firestore, 'orders', orderId);
    updateDocumentNonBlocking(orderRef, { status: 'Cancelled' });
  };
  
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Completed':
        return 'default';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (isUserLoading || !user) {
    return <main className="flex items-center justify-center min-h-[calc(100vh-10rem)]"><p>Loading...</p></main>;
  }

  return (
    <main className="container mx-auto py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription>View and manage all customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingOrders && <p>Loading orders...</p>}
          {!isLoadingOrders && (!orders || orders.length === 0) && <p>No orders found.</p>}
          {!isLoadingOrders && orders && orders.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Work Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="font-medium">{order.name}</div>
                      <div className="text-sm text-muted-foreground">{order.phone}</div>
                    </TableCell>
                    <TableCell>{order.weldingWorkType}</TableCell>
                    <TableCell>
                      {order.submissionDateTime ? format(new Date(order.submissionDateTime.seconds * 1000), 'PPP') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {order.status === 'Pending' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRejectOrder(order.id)}
                        >
                          Reject
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}