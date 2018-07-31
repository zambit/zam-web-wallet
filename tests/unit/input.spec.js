import { shallowMount } from '@vue/test-utils';
import vInput from '@/components/common/input';

describe('input.vue', () => {
  it('Render input label if showLabel prop is true', () => {
    const wrapper = shallowMount(vInput, {
      propsData: { showLabel: true },
    });
    expect(wrapper.contains('.input__label')).toBe(true);
  });
});
