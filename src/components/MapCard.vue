<template>
  <div class="card" @click="navigateToMap">
    <div class="card-content">
      <h2 class="card-title">{{ page?.replace(/(?<=[a-z])([A-Z])/g, ' $1') }}</h2>
      <div class="filters">
        <div class="icon-section">
          <div class="icons" v-tooltip.top="'Required Sets'">
          <span v-for="set in iconsSets" :key="set">
            <font-awesome-icon
                style="font-size: 30px"
                :icon="iconsAndColors[set].icon || 'xmark'"
                :color="iconsAndColors[set].color || 'black'"
            ></font-awesome-icon>
          </span>
          </div>
          <div class="dice" v-tooltip.top="'Scenario Player Range'">
          <span v-for="set in diceSets" :key="set">
            <font-awesome-icon
                style="font-size: 30px"
                :icon="iconsAndColors[set].icon || 'xmark'"
                :color="iconsAndColors[set].color || 'black'"
            ></font-awesome-icon>
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed} from "vue";
import {iconsAndColors} from '@/util/iconAndColors'

const props = defineProps<{
  page?: string
  requiredSets?: string[]
}>();

const diceRegex = /^\dP$/;
const iconsSets = computed(() => props.requiredSets?.filter(set => !diceRegex.test(set)) || []);
const diceSets = computed(() => props.requiredSets?.filter(set => diceRegex.test(set)) || []);

const navigateToMap = () => {
  window.open(`${import.meta.env.BASE_URL}maps/${props.page}.html`, '_blank');
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card:hover {
  background-color: #3f3f3f;

  .card-title {
    color: white;
  }
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card-title {
  margin: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon-section {
  display: flex;
  align-items: end;
  gap: 20px;
}

.icons, .dice {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icons {
  border-right: 2px solid #aaa;
  width: 150px;
  padding-right: 15px;
}

.dice {
  width: 100px;
  justify-content: center;
}

.icons span, .dice span {
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  align-items: center;
}

@media (max-width: 575px) {
  .filters {
    display: none;
  }
}
</style>