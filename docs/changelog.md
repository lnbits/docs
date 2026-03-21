# Changelog

> Release history for LNbits - new features, bug fixes, and breaking changes by version.

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()
const params = computed(() => page.value.params || {})
const version = computed(() => params.value.latestVersion || 'v1.5.0')
const releaseDate = computed(() => {
  const d = params.value.latestReleaseDate
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})
const releaseBody = computed(() => params.value.latestReleaseBody || '')
</script>

## {{ version }} {#latest}

<p v-if="releaseDate"><em>Released {{ releaseDate }} - Latest stable release</em></p>
<p v-else><em>Latest stable release</em></p>

<div v-if="releaseBody" v-html="releaseBody" class="release-notes"></div>
<p v-else>See the <a :href="'https://github.com/lnbits/lnbits/releases/tag/' + version">release notes on GitHub</a> for details.</p>

## Previous releases

For the complete changelog, see the [GitHub Releases](https://github.com/lnbits/lnbits/releases) page.

## Related Pages

- [Installation & Updating](/guide/installation/updating): Update to the latest version
- [Getting Started](/guide/): Quick-start guide
