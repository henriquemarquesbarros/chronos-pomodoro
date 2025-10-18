import type { TaskStateModel } from '../../models/TaskStateModel';
import { getFormattedSecondsRemaining } from '../../utils/getFormattedSecondsRemaining';
import { getNextCycle } from '../../utils/getNexCycle';
import { initialTaskState } from './initialTaskState';
import { type TaskActionModel, TaskActionTypes } from './TaskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;

      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining:
          getFormattedSecondsRemaining(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, interruptDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return { ...initialTaskState };
    }
    case TaskActionTypes.CHANGE_SECONDS_REMAINING: {
      const newSecondsRemaining = action.payload;

      return {
        ...state,
        secondsRemaining: newSecondsRemaining,
        formattedSecondsRemaining:
          getFormattedSecondsRemaining(newSecondsRemaining),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.CHANGE_SETTINGS: {
      return {
        ...state,
        config: {
          ...action.payload,
        },
      };
    }
  }

  // Sempre deve retornar o estado
  return state;
}
