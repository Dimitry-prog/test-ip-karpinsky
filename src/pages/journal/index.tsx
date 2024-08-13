import { INIT_JOURNAL_DATA } from '@/pages/journal/libs/constants.ts';
import JournalDataTable from '@/pages/journal/components/journal-data-table.tsx';
import { journalColumns } from '@/pages/journal/components/journal-columns.tsx';

const JournalPage = () => {
  // const { data: journalData, isError, isLoading, error } = useJournal(INIT_JOURNAL_REQUEST);
  // console.log({ journalData });
  return (
    // <section className="flex flex-col gap-2">
    //   {isLoading ? (
    //     <Loader2 className="size-12 animate-spin self-center" />
    //   ) : isError ? (
    //     <h2 className="text-lg text-destructive">{error.message}</h2>
    //   ) : (
    //     <>
    //       <JournalDataTable columns={journalColumns} data={INIT_JOURNAL_DATA} />
    //     </>
    //   )}
    // </section>
    <JournalDataTable columns={journalColumns} data={INIT_JOURNAL_DATA} />
  );
};

export default JournalPage;
