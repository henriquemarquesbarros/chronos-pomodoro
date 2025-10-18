import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { ButtonIcon } from '../ButtonIcon';
import { Cycles } from '../Cycles';
import { DefaultFormRow } from '../DefaultFormRow';
import { DefaultInput } from '../DefaultInput';
import styles from './styles.module.css';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNexCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { showMessage } from '../../adapters/showMessage';

type MainFormProps = {} & React.ComponentProps<'form'>;

export function MainForm({ ...props }: MainFormProps) {
  const TaskNameInput = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  const handleCreateNewTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    showMessage.dismiss();

    if (state.activeTask) {
      dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
      showMessage.error('Tarefa interrompida!');
      return;
    }

    const TaskName = TaskNameInput.current?.value;

    if (!TaskName) {
      showMessage.warn('Digite um nome para a tarefa.');
      return;
    }

    const duration = state.config[nextCycleType];

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: TaskName,
      duration: duration,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    showMessage.success('Tarefa iniciada com sucesso!');
  };

  return (
    <form onSubmit={handleCreateNewTask} className={styles.form} {...props}>
      <DefaultFormRow>
        <DefaultInput
          labelText='Task'
          type='text'
          id='task'
          ref={TaskNameInput}
          disabled={state.activeTask !== null}
          defaultValue={lastTaskName}
        />
      </DefaultFormRow>
      <DefaultFormRow>
        <span>
          {!state.activeTask ? (
            <>
              Próximo ciclo é de{' '}
              <strong>{state.config[nextCycleType]} minutos</strong>
            </>
          ) : (
            <>
              {state.activeTask.type == 'workTime' ? 'Foque' : 'Descanse'} por{' '}
              <strong>{state.config[state.activeTask.type]} minutos</strong>
            </>
          )}
        </span>
      </DefaultFormRow>
      <DefaultFormRow>
        <Cycles />
      </DefaultFormRow>
      <DefaultFormRow>
        {state.activeTask == null ? (
          <ButtonIcon icon={<PlayCircleIcon />} color='green' />
        ) : (
          <ButtonIcon icon={<StopCircleIcon />} color='red' />
        )}
      </DefaultFormRow>
    </form>
  );
}
