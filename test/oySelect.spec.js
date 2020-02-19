import {shallowMount} from '@vue/test-utils'
import oySelect from '../plugins/oyUI/base/oySelect'

describe('oySelect.vue', () => {
  it('renders option for each item in props.options', () => {
    const options = ['', '']
    const wrapper = shallowMount(oySelect, {
      propsData: {options}
    })
    //+1 because there is one static option which is disabled and selected
    expect(wrapper.findAll('option')).toHaveLength(options.length + 1)
  })
})
