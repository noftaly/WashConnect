<template>
	<Transition name="fade">
		<div v-if="active" class="overlay">
			<div class="overlay-boudary" @click="closeOverlay"/>
			<div class="overlay-content"
				:class="{ 'full': fullSize, 'fit': !fullSize, 'disable-overflow': removeOverflow }"
				:style="{ '--mxw': mxw }"
			>
				<div v-if="canDeactivate"
					class="overlay-content-close"
					@click.stop="closeOverlay"
					:style="{
						'--col': crossColor,
					}"
				/>
				<div class="overlay-content-box">
					<slot/>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
	active: { type: Boolean, required: true},
	crossColor: { type: String, required: false, default: 'rgb(132, 177, 240)'},
	fullSize: { type: Boolean, required: false, default: true },
	maxWidth: { type: String, required: false, default: "850px" },
	canDeactivate: { type: Boolean, required: false, default: true },
	removeOverflow: { type: Boolean, required: false, default: false },
})
const emits = defineEmits(['update:active']);

const active = ref(false);
const mxw = ref(props.fullSize ? props.maxWidth : "unset");
const canDeactivate = ref(props.canDeactivate);

const closeOverlay = () => {
	if(!canDeactivate.value) return;
	document.body.style.removeProperty('overflow');
	emits('update:active', false);
}

watch(() => props.active, val => {
	active.value = val;
});

</script>

<style lang="scss" scoped>
.overlay {
	height: 100vh;
	width: 100%;
	display: flex;
	position: fixed;
	justify-content: center;
	align-items: center;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	z-index: 1000;

	&-boudary {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: rgba(44, 44, 44, 0.4);
		z-index: 1001;
	}

	&-content {
		--mxw: unset;

		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
		border-radius: 10px;
		transition: opacity 300ms ease-in-out;
		overflow: hidden;
		position: relative;
		margin: 0 30px;
		z-index: 1002;

		&.disable-overflow {
			overflow: unset;
		}
		&.full { width: 100%; }
		&.fit { width: fit-content; }

		@media (min-width: 769px) {
			max-width: var(--mxw);
		}

		@media (max-width: 768px) {
			margin: 0 15px;
		}

		&-box {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 30px;

			@media (max-width: 768px) {
				height: fit-content;
				max-height: 90vh;
				overflow: scroll;
				align-items: unset;
				justify-content: unset;
			}
		}

		&-close {
			--col: '#fcbb6b';

			position: absolute;
			top: 0px;
			right: 0px;
			width: 50px;
			height: 50px;
			background: var(--col);
			clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
			border-radius: 0px 10px 0px;
			cursor: pointer;
			z-index: 2;

			&:hover {
				background: var(--col);
			}

			&::before, &::after {
				content: '';
				position: absolute;
				right: 14px;
				top: 4.5px;
				height: 20px;
				width: 3px;
				background-color: white;
				border-radius: 10px;
			}

			&::before { transform: rotate(45deg); }
			&::after { transform: rotate(-45deg); }
		}
	}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>