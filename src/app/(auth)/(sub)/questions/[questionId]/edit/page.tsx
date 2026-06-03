import QuestionEdit from '@/app/(auth)/(sub)/questions/[questionId]/edit/QuestionEdit';
import { cookies } from 'next/headers';

export default async function EditQuestionPage({ params }: { params: any }) {

  const cookieStore = await cookies()

  const question: any = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/${params.questionId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${cookieStore.get('session-token')?.value}`,
    }
  }).then((response) => response.json())

  console.log(question)

  return (
    <QuestionEdit question={question} />
  )
}
