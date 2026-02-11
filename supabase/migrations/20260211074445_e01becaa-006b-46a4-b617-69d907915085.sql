-- Prevent all updates to contact messages
CREATE POLICY "No updates allowed" ON public.contact_messages
  FOR UPDATE USING (false);

-- Prevent all deletes from contact messages
CREATE POLICY "No deletes allowed" ON public.contact_messages
  FOR DELETE USING (false);