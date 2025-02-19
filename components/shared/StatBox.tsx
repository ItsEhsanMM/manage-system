import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '../ui/card'
import '@/styles/statbox.css'

interface Props {
  content: string
  info: number
  percent: number
}

const StatBox = ({ content, info, percent }: Props) => {
  console.log(percent)
  return (
    <Card className='card'>
      <CardHeader className='title'>
        <p className='title-text text-2xl'>{content}</p>
      </CardHeader>
      <CardContent className='data'>
        <p>{info}</p>
        <div className='range'>
          <div
            style={{
              width: `${percent}%`
            }}
            className={cn('fill')}
          ></div>
        </div>
      </CardContent>
    </Card>
  )
}
export default StatBox
