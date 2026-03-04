
ALTER TABLE public.contact_messages ADD COLUMN is_read boolean NOT NULL DEFAULT false;

-- Allow admins to SELECT contact messages
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Drop the old restrictive no-select policy so admin policy works
DROP POLICY IF EXISTS "No public SELECT access" ON public.contact_messages;

-- Allow admins to UPDATE contact messages (mark read/unread)
CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to INSERT orders (for creating orders on behalf)
CREATE POLICY "Admins can insert orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
