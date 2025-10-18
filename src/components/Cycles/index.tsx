import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { getNextCycleClass } from '../../utils/getNextCycleClass';

export function Cycles() {
  const { state } = useTaskContext();
  return (
    <>
      {state.currentCycle > 0 && (
        <div className={styles.cycles}>
          <span>Ciclos:</span>
          <div className={styles.cycleDots}>
            {Array.from({ length: state.currentCycle }, (_, i) => {
              const type = getNextCycleType(i + 1);
              const className = `${styles.cycleDot} ${
                styles[getNextCycleClass(type)]
              }`;
              return (
                <div key={`cycle_${type}_${i}`} className={className}></div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
