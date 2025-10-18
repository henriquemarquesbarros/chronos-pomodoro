import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { ButtonIcon } from '../../components/ButtonIcon';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { DefaultFormRow } from '../../components/DefaultFormRow';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeIInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const longBreakTimeInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showMessage.dismiss();

    const workTime = Number(workTimeIInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);
    const errors = [];

    if (isNaN(workTime)) {
      errors.push('O tempo de foco deve ser um número');
    }

    if (isNaN(shortBreakTime)) {
      errors.push('O tempo de descanso curto deve ser um número');
    }

    if (isNaN(longBreakTime)) {
      errors.push('O tempo de descanso longo deve ser um número');
    }

    if (workTime! <= 0) {
      errors.push('O tempo de foco deve ser maior que zero');
    }

    if (shortBreakTime! <= 0) {
      errors.push('O tempo de descanso curto deve ser maior que zero');
    }

    if (longBreakTime! <= 0) {
      errors.push('O tempo de descanso longo deve ser maior que zero');
    }

    if (errors.length > 0) {
      showMessage.warn(errors.join(' | '));
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    showMessage.success('Configurações atualizadas com sucesso!');

    return;
  };

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curso e
          descanso longo.
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSubmit} className='form'>
          <DefaultFormRow>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeIInput}
              defaultValue={state.config.workTime}
              type='number'
            />
          </DefaultFormRow>
          <DefaultFormRow>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso curto'
              ref={shortBreakTimeInput}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </DefaultFormRow>
          <DefaultFormRow>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso longo'
              ref={longBreakTimeInput}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </DefaultFormRow>
          <DefaultFormRow>
            <ButtonIcon
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </DefaultFormRow>
        </form>
      </Container>
    </MainTemplate>
  );
}
