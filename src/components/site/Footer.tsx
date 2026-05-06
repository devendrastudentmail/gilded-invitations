import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t border-border/60 bg-white/40 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-xl font-bold">Hindu<span className="text-gradient">Invites</span></span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Cinematic, personalized digital wedding invitations crafted for every guest.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="mt-6 flex max-w-sm items-center gap-2 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-border">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email for updates" className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none" />
            <button className="rounded-full bg-gradient-primary px-4 py-2 text-xs font-semibold text-white">Subscribe</button>
          </form>
        </div>
        <div>
          <h4 className="font-accent text-sm font-semibold uppercase tracking-wider text-charcoal">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><a href="/#features" className="hover:text-primary">Features</a></li>
            <li><a href="#" className="hover:text-primary">Blog</a></li>
            <li><a href="#" className="hover:text-primary">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-accent text-sm font-semibold uppercase tracking-wider text-charcoal">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
            <li><a href="#" className="hover:text-primary">Terms</a></li>
            <li><a href="#" className="hover:text-primary">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HinduInvites. Crafted with love in India.
      </div>
    </footer>
  );
}
