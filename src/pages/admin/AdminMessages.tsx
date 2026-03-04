import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Mail, MailOpen } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages((data as Message[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const toggleRead = async (msg: Message) => {
    await supabase
      .from("contact_messages")
      .update({ is_read: !msg.is_read })
      .eq("id", msg.id);
    fetchMessages();
  };

  const openMessage = async (msg: Message) => {
    setSelected(msg);
    if (!msg.is_read) {
      await supabase.from("contact_messages").update({ is_read: true }).eq("id", msg.id);
      fetchMessages();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading messages...</p>;

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-3xl">Messages</h2>
        {unreadCount > 0 && (
          <Badge>{unreadCount} unread</Badge>
        )}
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${!msg.is_read ? "border-l-4 border-l-accent" : ""}`}
              onClick={() => openMessage(msg)}
            >
              <CardContent className="p-4 flex items-start gap-3">
                {msg.is_read ? (
                  <MailOpen className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                ) : (
                  <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`font-medium truncate ${!msg.is_read ? "font-bold" : ""}`}>{msg.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {format(new Date(msg.created_at), "dd MMM yyyy HH:mm")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.email}</p>
                  <p className="text-sm truncate mt-1">{msg.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading">Message from {selected.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <p><span className="text-muted-foreground">Email:</span> {selected.email}</p>
                <p><span className="text-muted-foreground">Date:</span> {format(new Date(selected.created_at), "dd MMM yyyy HH:mm")}</p>
                <div className="bg-muted/30 p-4 rounded whitespace-pre-wrap">{selected.message}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleRead(selected)}>
                    {selected.is_read ? "Mark as Unread" : "Mark as Read"}
                  </Button>
                  <Button size="sm" asChild>
                    <a href={`mailto:${selected.email}`}>Reply via Email</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
