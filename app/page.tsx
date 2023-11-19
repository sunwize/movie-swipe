'use client';

import { FormEvent, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const router = useRouter();

  const addEmail = (event: FormEvent) => {
    event.preventDefault();
    setEmails((value) => [email, ...value]);
    setEmail('');
  };

  const sendInvites = () => {
    const subject = 'Movie Tinder: Invite link!';
    const body = 'Colin has sent you an invite link, pick your movies so you can watch it together!';
    const a = document.createElement('a');
    a.href = `mailto:${emails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    a.click();
    a.remove();
    router.push('/swipe/1');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-blue-900 text-white leading-snug p-3">
      <section className="w-full max-w-[300px] mt-16">
        <form
          onSubmit={addEmail}
          className="min-w-[300px]"
        >
          <div>
            <label>
              Email
              <div className="w-full flex">
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="flex-1 text-black rounded-l-md py-2 px-3"
                />
                <button
                  disabled={!email}
                  className="bg-blue-600 rounded-r-md disabled:cursor-not-allowed disabled:bg-gray-500 px-3"
                >
                  <FaPlus />
                </button>
              </div>
            </label>
          </div>
        </form>
        {
          emails.length > 0 && (
            <>
              <div className="mt-12">
                <p className="text-2xl font-bold mb-1">Invitees</p>
                <ul className="grid grid-cols-1 gap-1">
                  {
                    emails.map((email, index) => (
                      <li key={index}>+ {email}</li>
                    ))
                  }
                </ul>
              </div>
              <div className="w-full mt-3">
                <button
                  onClick={sendInvites}
                  className="block w-full bg-blue-600 rounded-md shadow-md border border-2 border-blue-600 hover:border-white py-2 px-3"
                >
                    Send invite
                </button>
              </div>
            </>
          )
        }
      </section>
    </main>
  );
}
