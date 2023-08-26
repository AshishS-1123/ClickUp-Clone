'use client';

import React from 'react';
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../database.types';

// Supabase auth needs to be triggered client-side
export default function AuthForm({ session }: { session: Session | null }) {
	const supabase = createClientComponentClient<Database>();

	const handleEmailLogin = async () => {
		const { error } = await supabase.auth.signInWithPassword({
			email: 'jon@supabase.com',
			password: 'password'
		});

		if (error) {
			console.log({ error });
		}
	};

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.log({ error });
		}
	};

	// this `session` is from the root loader - server-side
	// therefore, it can safely be used to conditionally render
	// SSR pages without issues with hydration
	return session ? (
		<button onClick={handleLogout}>Logout</button>
	) : (
		<>
			<button onClick={handleEmailLogin}>Email Login</button>
		</>
	);
}
