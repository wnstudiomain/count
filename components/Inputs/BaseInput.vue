<template>
  <validation-provider v-slot="{errors, valid, invalid, validated}" :rules="rules" :name="name">
    <b-form-group>
      <slot name="label">
        <label v-if="label" :class="labelClasses">
          {{ label }}
        </label>
      </slot>
      <div
        :class="inputGroupClasses"
        class="input-block"
      >
        <i v-if="prependIcon" :class="prependIcon" />
        <input
          :value="value"
          :placeholder="placeholder"
          :type="type"
          :valid="valid"
          :required="required"
          class="el-input__inner"
          :class="[{'is-valid': valid && validated && successMessage}, {'is-invalid': invalid && validated}, inputClasses]"
          @input="updateValue"
        >
        <slot name="infoBlock" />
      </div>
      <slot name="success">
        <div v-if="valid && validated && successMessage" class="valid-feedback">
          {{ successMessage }}
        </div>
      </slot>
      <slot name="error">
        <div v-if="errors[0]" class="invalid-feedback" style="display: block;">
          {{ errors[0] }}
        </div>
      </slot>
    </b-form-group>
  </validation-provider>
</template>
<script>
export default {
  name: 'base-input',
  inheritAttrs: false,
  props: {
    required: {
      type: Boolean,
      description: 'Whether input is required (adds an asterix *)'
    },
    label: {
      type: String,
      description: 'Input label (text before input)'
    },
    error: {
      type: String,
      description: 'Input error (below input)'
    },
    successMessage: {
      type: String,
      description: 'Input success message',
      default: ''
    },
    labelClasses: {
      type: String,
      description: 'Input label css classes',
      default: 'form-control-label'
    },
    inputClasses: {
      type: String,
      description: 'Input css classes'
    },
    inputGroupClasses: {
      type: String,
      description: 'Input group css classes'
    },
    value: {
      type: [String, Number],
      description: 'Input value'
    },
    type: {
      type: String,
      description: 'Input type',
      default: 'text'
    },
    placeholder: {
      placeholder: String,
      description: 'Input placeholder',
      default: 'text'
    },
    prependIcon: {
      type: String,
      description: 'Prepend icon (left)'
    },
    rules: {
      type: [String, Array, Object],
      description: 'Vee validate validation rules',
      default: ''
    },
    name: {
      type: String,
      description: 'Input name (used for validation)',
      default: ''
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
