import { describe, test, assert } from 'vitest'
import { mount } from '@vue/test-utils'
import { wExpandable } from '#components'
import { nextTick } from 'vue'

describe('expandable', () => {
  assert.ok(wExpandable.name)

  test('can mount expanded', () => {
    const defaultSlot = '<h1>Hello Warp</h1>'
    const wrapper = mount(wExpandable, { props: { modelValue: true }, slots: { default: defaultSlot } })
    assert.equal(wrapper.text(), 'Hello Warp')
  })
  test('has a title area - prop', () => {
    const titleWrapper = mount(wExpandable, { props: { title: 'Hi' } })
    assert.equal(titleWrapper.text(), 'Hi')

    const defaultSlot = '<h1>Mom</h1>'
    const fullWrapper = mount(wExpandable, {
      props: { modelValue: true, title: 'Hi ' },
      slots: { default: defaultSlot }
    })
    assert.equal(fullWrapper.text(), 'Hi Mom')
  })
  test('has a title area - slot', () => {
    const titleSlot = '<h1>Hi </h1>'
    const titleWrapper = mount(wExpandable, { slots: { title: titleSlot } })
    assert.equal(titleWrapper.text(), 'Hi')

    const defaultSlot = '<h1>Mom</h1>'
    const fullWrapper = mount(wExpandable, {
      props: { modelValue: true },
      slots: { default: defaultSlot, title: titleSlot }
    })
    assert.equal(fullWrapper.text(), 'Hi Mom')
  })
  test('has a chevron', () => {
    const wrapper = mount(wExpandable, { props: { title: 'Yay' } })
    assert.include(wrapper.html(), '<svg ')

    const noChevronWrapper = mount(wExpandable, { props: { title: 'Yay', chevron: false } })
    assert.notInclude(noChevronWrapper.html(), '<svg ')
  })
  test('emits events', async () => {
    const wrapper = mount(wExpandable, { props: { title: 'Yay' } })
    wrapper.get('button').trigger('click')
    // we have to wait twice because the event trigger itself is waiting for the DOM!
    await Promise.all([nextTick, nextTick])
    assert.property(wrapper.emitted(), 'expand')

    wrapper.get('button').trigger('click')
    await Promise.all([nextTick, nextTick])
    assert.property(wrapper.emitted(), 'collapse')
  })
})
