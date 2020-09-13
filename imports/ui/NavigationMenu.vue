<template>
	<ul class="nav nav-tabs">
		<li class="nav-item">
			<router-link to="/students" class="nav-link">Students</router-link>
		</li>
		<li class="nav-item">
			<router-link to="/subjects" class="nav-link">Subjects</router-link>
		</li>
	</ul>
</template>

<script>
export default {
  name: 'NavigationMenu',
    data() {
      return {};
    }
}
</script>