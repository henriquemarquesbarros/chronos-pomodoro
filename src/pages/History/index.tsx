import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { formatDate } from '../../utils/formatDate';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
    () => ({
      tasks: sortTasks({
        tasks: state.tasks,
        field: 'startDate' as const,
        direction: 'desc' as const,
      }),
    }),
  );

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleClearHistory() {
    showMessage.dismiss();
    showMessage.confirm('Tem certeza?', confirmation => {
      if (confirmation) {
        dispatch({ type: 'RESET_STATE' });
      }
    });
  }
  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {state.tasks.length > 0 && (
            <span className={styles.buttonContainer}>
              <ButtonIcon
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title='Apagar histórico'
                onClick={handleClearHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {state.tasks.length > 0 ? (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração ↕
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration} min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>
                        {state.activeTask && state.activeTask.id === task.id
                          ? 'Em andamento'
                          : task.completeDate
                          ? 'Concluído'
                          : task.interruptDate
                          ? 'Interrompido'
                          : 'Abandonado'}
                      </td>
                      <td>
                        {task.type === 'workTime'
                          ? 'Foco'
                          : task.type === 'shortBreakTime'
                          ? 'Pausa Curta'
                          : 'Pausa Longa'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={styles.noTasks}>Nenhuma tarefa no histórico.</p>
        )}
      </Container>
    </MainTemplate>
  );
}
