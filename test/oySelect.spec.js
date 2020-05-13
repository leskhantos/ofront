import {shallowMount} from '@vue/test-utils'
import oySelect from '../plugins/oyUI/base/oySelect'

describe('oySelect.vue', () => {
  it('renders option for each item in props.options', () => {
    const options = ['', '']
    const wrapper = shallowMount(oySelect, {
      propsData: {
        options,
        label: 'Label',
        error: ['error']
      }
    })

    const text = wrapper.find('label').element.textContent
    const err = wrapper.find('small').element.textContent
    expect(text).toBe('Label')
    expect(err).toBe('error')
    expect(wrapper.findAll('option')).toHaveLength(options.length)
  })
})
