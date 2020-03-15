import { mount } from '@vue/test-utils'
import oyInput from "../plugins/oyUI/base/oyInput";

describe('oyInput', () => {
  it('check oy input main props data',  async  () => {
    const wrapper = mount(oyInput, {
      propsData: {
        label: 'test',
        value: 'asd',
        error: ['error']
      }
    })
    await wrapper.vm.$nextTick()
    const text = wrapper.find('label').element.textContent
    const input = wrapper.find('input').element.value
    const error = wrapper.find('small').element.textContent
    expect(wrapper.html()).toContain('<div class="oy-input vertical-orientation has-error" style="margin-bottom: 1.2rem;"><label>test</label> <input type="text" class="form-control form-control-sm"> <small class="oy-input__error">error</small></div>')
    expect(text).toBe('test')
    expect(input).toBe('asd')
    expect(error).toBe('error')
  })
})
