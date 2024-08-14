import { describe, expect, it } from 'vitest';
import { computed, reactive } from './reactive';
import { take } from 'rxjs';

describe('Computed', () => {
  it('emits a value change when its single source changes', () => {
    const source = reactive(1);

    const double = computed(() => source.value * 2);

    let emitted = false;
    double.valueChanges$.pipe(take(1)).subscribe(() => {
      emitted = true;
    });
    source.update(2);

    expect(emitted).toBeTruthy();
  });

  it('emits a value whenever one of the sources changes', () => {
    const a = reactive(1);
    const b = reactive(1);
    const c = reactive(1);

    const sum = computed(() => a.value + b.value + c.value);

    const emissions: number[] = [];

    sum.valueChanges$.pipe(take(3)).subscribe((newValue) => {
      emissions.push(newValue);
    });

    a.update(2);
    b.update(5);
    c.update(10);

    expect(emissions.length).toEqual(3);
    // Emission #1: 2 + 1 +1 = 4;
    // Emission #2: 2 + 5 + 1 = 8;
    // Emission #3: 2 + 5 + 10 = 17
    expect(emissions).toEqual([4, 8, 17]);
  });

  it('emits a value when it has a Computed has a single source and the source changes ', () => {
    const source = reactive(1);
    const double = computed(() => source.value * 2);

    const quadruple = computed(() => double.value * 2);

    let emitted = false;
    let val: number = 0;
    quadruple.valueChanges$.pipe(take(1)).subscribe((emittedValue) => {
      emitted = true;
      val = emittedValue;
    });
    source.update(2);

    expect(emitted).toBeTruthy();
    expect(val).toEqual(8);
  });
});
