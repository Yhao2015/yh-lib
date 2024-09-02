<template>
    <!-- 文本输入 -->
    <el-input
        v-if="item.type === 'input' || item.type == 'hidden'"
        v-model="formState[item.code]"
        :clearable="item.hasOwnProperty('clearable') ? item.clearable : true"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @input="(value) => methods.input(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    >
        <template #prefix v-if="item.extra && item.extra.prefix">{{ item.extra.prefix }}</template>
        <template #suffix v-if="item.extra && item.extra.suffix">{{ item.extra.suffix }}</template>
    </el-input>

    <el-input-number
        v-else-if="item.type === 'number' || item.type === 'numberhidden'"
        v-model="formState[item.code]"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />

    <el-input
        type="textarea"
        v-else-if="item.type == 'textarea'"
        v-model="formState[item.code]"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @input="(value) => methods.input(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />

    <el-input
        type="password"
        v-else-if="item.type == 'password'"
        v-model="formState[item.code]"
        :placeholder="item.placeholder || '请输入'"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @input="(value) => methods.input(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />

    <!-- 选择类 -->
    <el-radio-group
        v-else-if="item.type == 'radio' || item.type == 'radio-button'"
        v-model="formState[item.code]"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
    >
        <template v-if="item.type == 'radio-button'">
            <el-radio-button v-for="options in item.options" :disabled="options.disabled" :label="options[item.fieldName ? item.fieldName.value || 'value' : 'value']">
                {{ options[item.fieldName ? item.fieldName.label || 'label' : 'label'] }}
            </el-radio-button>
        </template>
        <template v-else>
            <el-radio v-for="options in item.options" :disabled="options.disabled" :label="options[item.fieldName ? item.fieldName.value || 'value' : 'value']">
                {{ options[item.fieldName ? item.fieldName.label || 'label' : 'label'] }}
            </el-radio>
        </template>
    </el-radio-group>

    <el-checkbox-group v-else-if="item.type == 'checkbox'" v-model="formState[item.code]" :disabled="item.disabled" v-bind="item.extra" @change="(value) => methods.change(value, item)">
        <el-checkbox v-for="options in item.options" :disabled="options.disabled" :label="options[item.fieldName ? item.fieldName.value || 'value' : 'value']">
            {{ options[item.fieldName ? item.fieldName.label || 'label' : 'label'] }}
        </el-checkbox>
    </el-checkbox-group>

    <el-select
        v-else-if="item.type == 'select'"
        v-model="formState[item.code]"
        :clearable="item.hasOwnProperty('clearable') ? item.clearable : true"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
    >
        <el-option
            v-for="options in item.options"
            :key="options[item.fieldName ? item.fieldName.value || 'value' : 'value']"
            :label="options[item.fieldName ? item.fieldName.label || 'label' : 'label']"
            :value="options[item.fieldName ? item.fieldName.value || 'value' : 'value']"
            :disabled="options.disabled"
        />
    </el-select>

    <el-tree-select
        v-else-if="item.type == 'treeSelect'"
        :data="item.options"
        :render-after-expand="false"
        v-bind="item.extra"
    />

    <el-cascader
        v-else-if="item.type == 'cascader'"
        v-model="formState[item.code]"
        :options="item.options"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
    />

    <el-switch
        v-else-if="item.type == 'switch'"
        v-model="formState[item.code]"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
    />

    <!-- 时间 -->
    <el-date-picker
        v-else-if="['datetime', 'date', 'week', 'month', 'year', 'dates'].includes(item.type)"
        v-model="formState[item.code]"
        :type="item.type"
        :placeholder="item.placeholder || '请选择'"
        :disabled="item.disabled"
        :clearable="item.hasOwnProperty('clearable') ? item.clearable : true"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />

    <el-date-picker
        v-else-if="['daterange', 'monthrange', 'datetimerange'].includes(item.type)"
        v-model="formState[item.code]"
        :type="item.type"
        :range-separator="(item.extra && item.extra['range-separator']) || '至'"
        :start-placeholder="(item.extra && item.extra['start-placeholder']) || '开始时间'"
        :end-placeholder="(item.extra && item.extra['end-placeholder']) || '结束时间'"
        :disabled="item.disabled"
        :clearable="item.hasOwnProperty('clearable') ? item.clearable : true"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />

    <el-time-picker
        v-else-if="item.type == 'time'"
        :placeholder="item.placeholder || '请选择'"
        v-model="formState[item.code]"
        :disabled="item.disabled"
        :clearable="item.hasOwnProperty('clearable') ? item.clearable : true"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />

    <el-time-picker
        v-else-if="item.type == 'timeRange'"
        v-model="formState[item.code]"
        is-range
        :range-separator="(item.extra && item.extra['range-separator']) || '至'"
        :start-placeholder="(item.extra && item.extra['start-placeholder']) || '开始时间'"
        :end-placeholder="(item.extra && item.extra['end-placeholder']) || '结束时间'"
        :disabled="item.disabled"
        :clearable="item.hasOwnProperty('clearable') ? item.clearable : true"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />

    <el-time-select
        v-else-if="item.type == 'timeSelect'"
        v-model="formState[item.code]"
        :placeholder="item.placeholder || '请选择'"
        :start="(item.extra && item.extra.start) || '00:00'"
        :step="(item.extra && item.extra.step) || '00:15'"
        :end="(item.extra && item.extra.end) || '23:59'"
        :disabled="item.disabled"
        :clearable="item.hasOwnProperty('clearable') ? item.clearable : true"
        v-bind="item.extra"
        @change="(value) => methods.change(value, item)"
        @blur="(value) => methods.blur(value, item)"
        @focus="(value) => methods.focus(value, item)"
    />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps({
    item: {
        type: Object,
        default: () => {}
    },
    formState: {
        type: Object,
        default: () => {}
    },
    methods: {
        type: Object,
        default: () => {}
    }
})
</script>
