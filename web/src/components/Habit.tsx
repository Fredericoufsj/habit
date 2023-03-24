interface HabitProps{
    completed: number;
}

export function Habit(habitProps : HabitProps) {
  return(
<div>
    {habitProps.completed}
</div>);
}
