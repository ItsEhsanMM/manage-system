import { Card, CardContent, CardHeader } from '../ui/card'
import '@/styles/statbox.css'

interface Props {
  content: string
  info: number
}

const StatBox = ({ content, info }: Props) => {
  return (
    <Card className='card'>
      <CardHeader className='title'>
        <p className='title-text text-2xl'>{content}</p>
      </CardHeader>
      <CardContent className='data'>
        <p>{info}</p>
        <div className='range'>
          <div className={`fill w-full`}></div>
        </div>
      </CardContent>
    </Card>
  )
}
export default StatBox
