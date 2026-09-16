CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.publish_status AS ENUM ('draft', 'published');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE OR REPLACE FUNCTION public.claim_ceasiun_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL OR lower(coalesce(auth.jwt() ->> 'email', '')) <> 'ceasiun@gmail.com' THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles(user_id, role) VALUES (auth.uid(), 'admin') ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_ceasiun_admin() TO authenticated;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Ceasiun admin claims role" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND role = 'admin' AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'ceasiun@gmail.com');

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL, title text NOT NULL,
  excerpt text NOT NULL DEFAULT '', cover_url text, category text NOT NULL DEFAULT 'Insights',
  tags text[] NOT NULL DEFAULT '{}', body text NOT NULL DEFAULT '', author text NOT NULL DEFAULT 'Ceasiun Team',
  status public.publish_status NOT NULL DEFAULT 'draft', published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published posts" ON public.blog_posts FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated reads published posts" ON public.blog_posts FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL, title text NOT NULL,
  category text NOT NULL, summary text NOT NULL DEFAULT '', problem text NOT NULL DEFAULT '',
  approach text NOT NULL DEFAULT '', result text NOT NULL DEFAULT '', cover_url text,
  is_sample boolean NOT NULL DEFAULT true, status public.publish_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.case_studies TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.case_studies TO authenticated;
GRANT ALL ON public.case_studies TO service_role;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published cases" ON public.case_studies FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated reads cases" ON public.case_studies FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert cases" ON public.case_studies FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update cases" ON public.case_studies FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete cases" ON public.case_studies FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), quote text NOT NULL, attribution text NOT NULL DEFAULT 'Sample client',
  company text NOT NULL DEFAULT 'Sample company', is_sample boolean NOT NULL DEFAULT true,
  is_visible boolean NOT NULL DEFAULT false, sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible testimonials" ON public.testimonials FOR SELECT TO anon USING (is_visible);
CREATE POLICY "Authenticated reads testimonials" ON public.testimonials FOR SELECT TO authenticated USING (is_visible OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.career_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, location text NOT NULL DEFAULT 'Remote / Pakistan',
  type text NOT NULL DEFAULT 'Full-time', description text NOT NULL DEFAULT '', is_visible boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.career_openings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.career_openings TO authenticated;
GRANT ALL ON public.career_openings TO service_role;
ALTER TABLE public.career_openings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible openings" ON public.career_openings FOR SELECT TO anon USING (is_visible);
CREATE POLICY "Authenticated reads openings" ON public.career_openings FOR SELECT TO authenticated USING (is_visible OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert openings" ON public.career_openings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update openings" ON public.career_openings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete openings" ON public.career_openings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL, phone text,
  service text NOT NULL, message text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT, DELETE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits contact" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (char_length(name) BETWEEN 2 AND 100 AND char_length(email) BETWEEN 5 AND 254 AND char_length(message) BETWEEN 10 AND 5000);
CREATE POLICY "Admins read contacts" ON public.contact_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete contacts" ON public.contact_submissions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX blog_posts_status_published_idx ON public.blog_posts(status, published_at DESC);
CREATE INDEX case_studies_status_idx ON public.case_studies(status);
CREATE INDEX testimonials_visible_order_idx ON public.testimonials(is_visible, sort_order);
