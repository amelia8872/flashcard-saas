'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import getStripe from '@/utils/get-stripe';
import { useSearchParams } from 'next/navigation';

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCheckoutSession() {
      if (!session_id) {
        return;
      }

      try {
        const res = await fetch(
          '/api/checkout_session?session_id=${session_id}'
        );
        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return <Container maxWidth = "100vw" sx={{textAlign="center", mt:4}}>
      <CircularProgress />
      <Typography variant="h6">Loading...</Typography>

    </Container>>
  }

  if (error) {
    return <Container maxWidth = "100vw" sx={{textAlign="center", mt:4}}>
      <CircularProgress />
      <Typography variant="h6">{error}</Typography>

    </Container>>
  }

  return (
   <Container maxWidth = "100vw" sx={{textAlign="center", mt:4}}>
      {session.payment._status === 'paid' ? (<><Typography variant='h4'>Thank you for purchasing.</Typography>
      <Box sx={{mt:22}}><Typography>Session ID: {session_id}</Typography>
      <Typography variant={body1}>We have received your payment. You will receive an email with the order details shortly.</Typography>
      </Box></>):(
        <><Typography variant='h4'>Payment Failed.</Typography>

        <Typography variant={body1}>Your payment was not seccessful!</Typography>
        </Box></>
      )}

    </Container>>
  );
};
