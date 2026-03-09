
-- Make user_id nullable for guest checkout
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;

-- Allow guest order inserts via edge function (service role bypasses RLS)
-- Add policy for authenticated users to insert their own orders
CREATE POLICY "Users can insert own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to insert order items for their own orders
CREATE POLICY "Users can insert own order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
));
