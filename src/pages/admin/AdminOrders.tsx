import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { Search, Download, Eye } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Order = Tables<"orders">;
type OrderItem = Tables<"order_items">;

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const viewOrder = async (order: Order) => {
    setSelectedOrder(order);
    const { data } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id);
    setOrderItems(data || []);
  };

  const updateStatus = async (orderId: string, field: "order_status" | "payment_status", value: string) => {
    const { error } = await supabase.from("orders").update({ [field]: value }).eq("id", orderId);
    if (error) { toast.error("Failed to update"); return; }
    toast.success("Status updated");
    fetchOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, [field]: value } : null);
    }
  };

  const updateTracking = async (orderId: string, tracking: string) => {
    const { error } = await supabase.from("orders").update({ tracking_number: tracking }).eq("id", orderId);
    if (error) toast.error("Failed to update");
    else { toast.success("Tracking updated"); fetchOrders(); }
  };

  const formatCurrency = (cents: number) =>
    `R${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.order_status === statusFilter;
    return matchSearch && matchStatus;
  });

  const exportCSV = () => {
    const headers = ["Order Number","Customer","Email","Phone","Total","Payment","Status","Date"];
    const rows = filtered.map((o) => [
      o.order_number, o.customer_name, o.customer_email, o.customer_phone || "",
      (o.total / 100).toFixed(2), o.payment_status, o.order_status,
      format(new Date(o.created_at), "yyyy-MM-dd"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  if (loading) return <p className="text-muted-foreground">Loading orders...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-heading text-3xl">Orders</h2>
        <Button variant="outline" size="sm" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order #, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left bg-muted/30">
                  <th className="p-3 font-medium">Order #</th>
                  <th className="p-3 font-medium">Customer</th>
                  <th className="p-3 font-medium">Total</th>
                  <th className="p-3 font-medium">Payment</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Date</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No orders found</td></tr>
                ) : (
                  filtered.map((o) => (
                    <tr key={o.id} className="border-b hover:bg-muted/20">
                      <td className="p-3 font-mono text-xs">{o.order_number}</td>
                      <td className="p-3">{o.customer_name}</td>
                      <td className="p-3">{formatCurrency(o.total)}</td>
                      <td className="p-3">
                        <Badge variant={o.payment_status === "paid" ? "default" : "outline"} className="capitalize text-xs">
                          {o.payment_status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="secondary" className="capitalize text-xs">{o.order_status}</Badge>
                      </td>
                      <td className="p-3 text-muted-foreground">{format(new Date(o.created_at), "dd MMM yyyy")}</td>
                      <td className="p-3">
                        <Button variant="ghost" size="icon" onClick={() => viewOrder(o)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order detail dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">Order {selectedOrder.order_number}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">{selectedOrder.customer_name}</p>
                    <p>{selectedOrder.customer_email}</p>
                    <p>{selectedOrder.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Shipping</p>
                    <p>{selectedOrder.shipping_address}</p>
                    <p>{[selectedOrder.shipping_city, selectedOrder.shipping_province, selectedOrder.shipping_postal_code].filter(Boolean).join(", ")}</p>
                    <p>{selectedOrder.shipping_country}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-muted-foreground text-xs block mb-1">Order Status</label>
                    <Select
                      value={selectedOrder.order_status}
                      onValueChange={(v) => updateStatus(selectedOrder.id, "order_status", v)}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs block mb-1">Payment Status</label>
                    <Select
                      value={selectedOrder.payment_status}
                      onValueChange={(v) => updateStatus(selectedOrder.id, "payment_status", v)}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground text-xs block mb-1">Tracking Number</label>
                  <div className="flex gap-2">
                    <Input
                      defaultValue={selectedOrder.tracking_number || ""}
                      placeholder="Enter tracking number"
                      onBlur={(e) => {
                        if (e.target.value !== (selectedOrder.tracking_number || "")) {
                          updateTracking(selectedOrder.id, e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Order items */}
                <div>
                  <p className="text-muted-foreground text-xs mb-2">Items</p>
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                        {item.product_image && (
                          <img src={item.product_image} alt="" className="w-10 h-10 rounded object-cover" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{item.product_name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.total_price)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-3 space-y-1 text-right">
                  <p>Subtotal: {formatCurrency(selectedOrder.subtotal)}</p>
                  <p>Shipping: {formatCurrency(selectedOrder.shipping_cost)}</p>
                  <p className="font-bold text-lg">Total: {formatCurrency(selectedOrder.total)}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
