<script setup>
import { wAlert, wButton } from '#components'
import { radio, checkbox } from '#dev-util'
import { reactive } from 'vue'

const randomElementFrom = arr => arr[Math.floor(Math.random()*arr.length)]
const sentences = [
  `there are zombies in mah Cheerios`,
  `there is peanut butter on the ceiling`,
  `this lamp has a lot of cheese`,
  `there are tiny robots in my socks`
]
const sentence = randomElementFrom(sentences)
const showState = reactive({ Show: true })
const showControls = [{ name: 'Show', checkbox }]
const variants = {
  Negative: {
    negative: true,
    title: `Oh no ${sentence}!`
  },
  Positive: {
    positive: true,
    title: `Hooray ${sentence}!`
  },
  Warning: {
    warning: true,
    title: `Maybe ${sentence}?`
  },
  Info: {
    info: true,
    title: `Just so you know, ${sentence}.`
  }
}
const current = reactive({ active: 'Negative' })
const variantControls = [
  { name: 'Negative', radio },
  { name: 'Positive', radio },
  { name: 'Warning', radio },
  { name: 'Info', radio },
]
</script>

<template>
  <div>
    <component-title title="Alert" />

    <token :state="[showState, current]">
      <w-alert v-model="showState.Show" v-bind="variants[current.active]">
        <p>This is the message text that can be short or a little bit long</p>
        <div class="space-x-8">
          <w-button small>Primary CTA</w-button>
          <w-button small quiet>Secondary CTA</w-button>
        </div>
      </w-alert>
    </token>

    <demo-controls class="flex" x>
      <demo-control label="Visibility" :controls="showControls" :state="showState" />
      <demo-control label="Variants" :controls="variantControls" :state="current" />
    </demo-controls>
  </div>
</template>
