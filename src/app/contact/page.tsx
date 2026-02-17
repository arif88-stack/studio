import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import Link from 'next/link';
import WhatsappIcon from "@/components/icons/WhatsappIcon";

export default function ContactPage() {
  const phoneNumber = "+1234567890"; // Replace with actual phone number
  const whatsappNumber = "1234567890"; // Replace with actual number without '+' or spaces
  const email = "contact@weldorder.com"; // Replace with actual email

  return (
    <main className="container mx-auto max-w-2xl py-8 px-4 animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
          <CardDescription>We're here to help. Reach out to us with any questions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Link href={`tel:${phoneNumber}`} className="block">
              <Button variant="outline" className="w-full justify-start text-base py-6">
                <Phone className="mr-3 h-5 w-5" />
                Call Us: {phoneNumber}
              </Button>
            </Link>
            <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline" className="w-full justify-start text-base py-6">
                <WhatsappIcon className="mr-3 h-5 w-5" />
                WhatsApp Us
              </Button>
            </Link>
            <Link href={`mailto:${email}`} className="block">
              <Button variant="outline" className="w-full justify-start text-base py-6">
                <Mail className="mr-3 h-5 w-5" />
                Email Us: {email}
              </Button>
            </Link>
          </div>
          <div className="text-center text-muted-foreground">
            <p className="font-semibold">Business Hours:</p>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
