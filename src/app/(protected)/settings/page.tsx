import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const Settings = async () => {
  const session = await auth();

  return (
    <div>
      <p className='text-center mt-3'>{JSON.stringify(session)}</p>

      <form
        action={async () => {
          'use server';

          await signOut();
        }}
      >
        <Button
          type='submit'
          className='m-auto block mt-3 rounded-[100px]'
        >
          Sign out
        </Button>
      </form>
    </div>
  );
};

export default Settings;
