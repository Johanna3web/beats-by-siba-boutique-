import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingCart, Clock, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  unreadMessages: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  customer_name: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalRevenue: 0, totalOrders: 0, pendingOrders: 0, unreadMessages: 0 });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [ordersRes, messagesRes] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("id, is_read").eq("is_read", false),
      ]);

      const orders = ordersRes.data || [];
      const paidOrders = orders.filter((o) => o.payment_status === "paid");
      const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
      const pendingOrders = orders.filter((o) => o.order_status === "processing").length;

      setStats({
        totalRevenue,
        totalOrders: orders.length,
        pendingOrders,
        unreadMessages: messagesRes.data?.length || 0,
      });

      setRecentOrders(orders.slice(0, 10) as RecentOrder[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const formatCurrency = (cents: number) =>
    `R${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;

  const statusColor = (s: string) => {
    switch (s) {
      case "delivered": return "default";
      case "shipped": return "secondary";
      case "processing": return "outline";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-3xl">Dashboard</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.pendingOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.unreadMessages}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 font-medium">Order</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Total</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-3 font-mono text-xs">{o.order_number}</td>
                      <td className="py-3">{o.customer_name}</td>
                      <td className="py-3">{formatCurrency(o.total)}</td>
                      <td className="py-3">
                        <Badge variant={statusColor(o.order_status) as any} className="capitalize">
                          {o.order_status}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {format(new Date(o.created_at), "dd MMM yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
