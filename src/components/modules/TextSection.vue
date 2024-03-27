<template>
    <section class="rounded-2xl bg-white text-black border-2 border-black p-2 size-2/3">
        <h2 class="rounded-xl bg-black text-white border-2 border-slate p-2">
            <slot name="title"></slot>
        </h2>
        <p class="text-black">
            <slot name="paragraph"></slot>
        </p>
    </section>
</template>
