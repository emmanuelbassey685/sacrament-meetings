import NavLinks from '@/components/NavLinks';
export default function MeetingsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <div className="mx-auto max-w-6xl px-5"><NavLinks />{children}</div>; }
