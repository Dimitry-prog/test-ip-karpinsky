import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button.tsx';
import { ChevronLeftIcon, Loader2 } from 'lucide-react';
import { useJournalSingle } from '@/pages/journal-single/hooks/use-journal-single.ts';
import { formatDateTime } from '@/shared/lib/utils.ts';

const JournalSinglePage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    data: journalData,
    isError,
    isLoading,
    error,
  } = useJournalSingle(pathname.split('/').at(-1)!);

  return (
    <section className="flex flex-col gap-5">
      <Button onClick={() => navigate('/journal')} variant="ghost" size="sm" className="self-start">
        <ChevronLeftIcon className="size-4" />
        Back
      </Button>

      {isLoading ? (
        <Loader2 className="size-12 animate-spin self-center" />
      ) : isError ? (
        <h2 className="text-lg text-destructive">{error.message}</h2>
      ) : journalData ? (
        <article className="space-y-8">
          <div className="flex flex-col gap-2">
            <h2>
              <span className="font-bold">Created at:</span>{' '}
              {formatDateTime(journalData.createdAt as string).dateTime}
            </h2>
            <p>
              <span className="font-bold">Event ID:</span> {journalData.eventId}
            </p>
          </div>

          <div className="space-y-2">
            {journalData.text.split('\r\n').map((text) => (
              <p>{text}</p>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
};

export default JournalSinglePage;
