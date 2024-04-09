import { Calendar, CalendarProps } from 'antd'
import { Dayjs } from 'dayjs'

const TodoCalendar = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }
  return (
    <div className="w-[300px]">
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  )
}

export default TodoCalendar
