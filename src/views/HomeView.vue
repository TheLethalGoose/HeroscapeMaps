<template>
  <div>
    <div class="control-panel">
      <div class="filter-controls">
        <div class="control-group">
          <label class="icon-label" @click="exclusiveToggle = !exclusiveToggle">
            <font-awesome-icon
                :color="!exclusiveToggle ? '#ff184d' : '#1ec252'"
                :size="'3x'"
                :icon="!exclusiveToggle ? 'bullseye' : 'circle-dot'"
                v-tooltip.bottom="'Filter Exklusive'"
            />
          </label>
        </div>
        <div class="control-group">
          <label v-for="set in iconsSets" :key="set" class="icon-label" @click="toggleFilter(set)">
            <font-awesome-icon
                :size="'3x'"
                :style="{ opacity: isActive(set) ? '1' : '0.5'}"
                :icon="iconsAndColors[set].icon || 'xmark'"
                :color="iconsAndColors[set].color || 'black'"
                v-tooltip.bottom="iconsAndColors[set].tooltip || 'null'"
            />
          </label>
        </div>
        <div class="control-group">
          <label v-for="set in diceSets" :key="set" class="icon-label" @click="toggleFilter(set)">
            <font-awesome-icon
                :size="'3x'"
                :style="{ opacity: isActive(set) ? '1.5' : '0.5'}"
                :icon="iconsAndColors[set].icon || 'xmark'"
                :color="iconsAndColors[set].color || 'black'"
                v-tooltip.bottom="iconsAndColors[set].tooltip || 'null'"
            />
          </label>
        </div>
      </div>
    </div>

    <ul id="linkList">
      <li v-for="map in filteredMaps" :key="map.name">
        <MapCard :page="map.name" :gary="map.url" :requiredSets="map.requiredSets"></MapCard>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { maps } from '@/data/maps'
import { iconsAndColors } from '@/util/iconAndColors'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import MapCard from '@/components/MapCard.vue'

const requiredSets: Set<string> = new Set();

maps.forEach((map: {name: string, requiredSets: string[]}) => {
  map.requiredSets.forEach(attr => requiredSets.add(attr));
});

const diceRegex = /^\dP$/;
const iconsSets = computed(() => Array.from(requiredSets)
    .filter(set => !diceRegex.test(set))
    .sort((mapA, mapB) => iconsAndColors[mapA].id - iconsAndColors[mapB].id) || []);
const diceSets = computed(() => Array.from(requiredSets)
    .filter(set => diceRegex.test(set))
    .sort((mapA, mapB) => iconsAndColors[mapA].id - iconsAndColors[mapB].id) || []);

const activeFilters = ref<string[]>([]);
const exclusiveToggle = ref(false);

const filteredMaps = computed(() => {
  if (activeFilters.value.length === 0) {
    return maps;
  }
  if (exclusiveToggle.value) {
    return maps.filter(map => {
      const currentActiveFilters = activeFilters.value;

      const playerFilters = currentActiveFilters.filter(filter => diceRegex.test(filter));
      const hasRequiredPlayerCount = playerFilters.length === 0 || playerFilters.some(filter => map.requiredSets.includes(filter));
      const otherFilters = currentActiveFilters.filter(filter => !diceRegex.test(filter));

      if(map.name === 'WellspringOfObsession'){otherFilters.push('RV')}
      if(map.name === 'BloodredRiver'){otherFilters.push('TT');}

      const allOtherFiltersIncluded = otherFilters.every(filter => map.requiredSets.includes(filter));
      const hasExactOtherIcons = otherFilters.length === map.requiredSets.filter(attr => !diceRegex.test(attr)).length;

      return hasRequiredPlayerCount && allOtherFiltersIncluded && hasExactOtherIcons;
    });
  }
  return maps.filter(map => {
    return activeFilters.value.some(filter => map.requiredSets.includes(filter));
  });
});

const toggleFilter = (attr: string) => {
  const index = activeFilters.value.indexOf(attr);
  if (index > -1) {
    activeFilters.value.splice(index, 1);
  } else {
    activeFilters.value.push(attr);
  }
};
const isActive = (attr: string) => {
  return activeFilters.value.includes(attr);
};
</script>

<style scoped>
.filter-controls {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.control-group {
  padding-right: 25px;
}

.icon-label {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  margin-right: 1em;
  transition: opacity 0.3s;
}

#linkList {
  list-style-type: none;
  padding: 0;
}

#linkList li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
}
</style>