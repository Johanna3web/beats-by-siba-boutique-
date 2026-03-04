import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;
type Order = Tables<"orders">;

const AdminCustomers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      setProfiles(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const viewCustomer = async (profile: Profile) => {
    setSelectedProfile(profile);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", profile.user_id)
      .order("created_at", { ascending: false });
    setCustomerOrders(data || []);
  };

  const formatCurrency = (cents: number) =>
    `R${(cents / 100).toLocaleString("en-ZA", { minimumFractionDigits: 2 })}`;

  const filtered = profiles.filter((p) =>
    (p.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    p.user_id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-muted-foreground">Loading customers...</p>;

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-3xl">Customers</h2>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-left">
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Phone</th>
                  <th className="p-3 font-medium">Joined</th>
                  <th className="p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No customers found</td></tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-muted/20">
                      <td className="p-3 font-medium">{p.full_name || "—"}</td>
                      <td className="p-3">{p.phone || "—"}</td>
                      <td className="p-3 text-muted-foreground">{format(new Date(p.created_at), "dd MMM yyyy")}</td>
                      <td className="p-3">
                        <Button variant="ghost" size="icon" onClick={() => viewCustomer(p)}>
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

      <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
        <DialogContent className="max-w-lg">
          {selectedProfile && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">{selectedProfile.full_name || "Customer"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <p><span className="text-muted-foreground">Phone:</span> {selectedProfile.phone || "—"}</p>
                <p><span className="text-muted-foreground">Joined:</span> {format(new Date(selectedProfile.created_at), "dd MMM yyyy")}</p>

                <div>
                  <p className="text-muted-foreground mb-2">Order History ({customerOrders.length})</p>
                  {customerOrders.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No orders</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {customerOrders.map((o) => (
                        <div key={o.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                          <span className="font-mono">{o.order_number}</span>
                          <Badge variant="secondary" className="capitalize">{o.order_status}</Badge>
                          <span>{formatCurrency(o.total)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomers;
