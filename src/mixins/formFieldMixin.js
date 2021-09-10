// eslint-disable-next-line import/extensions,import/no-unresolved
import BaseFormField from '@/components/BaseFormField';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
