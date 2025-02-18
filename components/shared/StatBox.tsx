import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface Props {
  content: string
  info: number
}

const StatBox = ({ content, info }: Props) => {
  return (
    <Card className='flex h-40 max-w-[30%] flex-col items-center'>
      <CardHeader className='size-full text-center text-2xl'>
        <CardTitle>{content}:</CardTitle>
      </CardHeader>
      <CardContent className='flex size-full items-center justify-center text-3xl'>
        <span className=''>{info}</span>
      </CardContent>
    </Card>
  )
}
export default StatBox
