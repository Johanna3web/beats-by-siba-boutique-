-- Deny all SELECT access to contact_messages (no public reads)
CREATE POLICY "No public SELECT access" ON public.contact_messages
  FOR SELECT USING (false);