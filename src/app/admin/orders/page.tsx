'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, doc } from 'firebase/firestore';
import { format } from 'date-fns';

import { useFirebase, useUser, useCollection, useDoc, updateDocumentNonBlocking, useMemoFirebase } from '@/firebase';
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

  const adminRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'admin_users', user.uid);
  }, [firestore, user]);

  const { data: adminRole, isLoading: isLoadingAdminRole } = useDoc(adminRoleRef);
  const isUserAdmin = !!adminRole;

  const ordersCollection = useMemoFirebase(() => {
    if (!firestore || !isUserAdmin) return null;
    return collection(firestore, 'orders');
  }, [firestore, isUserAdmin]);
  
  const { data: orders, isLoading: isLoadingOrders } = useCollection<Order>(ordersCollection);

  useEffect(() => {
    const doneLoading = !isUserLoading && !isLoadingAdminRole;
    if (doneLoading) {
      if (!user) {
        router.replace('/admin/login');
      } else if (!isUserAdmin) {
        router.replace('/'); 
      }
    }
  }, [user, isUserLoading, isUserAdmin, isLoadingAdminRole, router]);

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

  if (isUserLoading || isLoadingAdminRole || !isUserAdmin) {
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
                  <TableHead>Dimensions</TableHead>
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
                      <div className="text-sm text-muted-foreground max-w-xs truncate">{order.address}</div>
                    </TableCell>
                    <TableCell>{order.weldingWorkType}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {`${order.length} x ${order.width} x ${order.height} ft`}
                    </TableCell>
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
