<template>
    <div class="flex flex-wrap">
        <!-- Form -->
        <div class="w-full lg:w-1/3">
            <div class="max-w-xlg mx-auto p-6 bg-white shadow-xl rounded-lg">
                <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                    {{ isEditing ? "Edit Experience" : "Add Experience" }}
                </h2>

                <form @submit.prevent="isEditing ? updateExperience() : addExperience()" class="space-y-5">
                    <!-- Title -->
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" id="title" v-model="experience.title"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
                    </div>

                    <!-- Company -->
                    <div>
                        <label for="company" class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input type="text" id="company" v-model="experience.company"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
                    </div>

                    <!-- Location -->
                    <div>
                        <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" id="location" v-model="experience.location"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
                    </div>

                    <!-- Job Change Number -->
                    <div>
                        <label for="order_no" class="block text-sm font-medium text-gray-700 mb-1">Job Change
                            Number</label>
                        <input type="number" id="order_no" v-model="experience.order_no"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- From Date -->
                        <div>
                            <label for="from_date" class="block text-sm font-medium text-gray-700 mb-1">From
                                Date</label>
                            <input type="date" id="from_date" v-model="experience.from_date"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
                        </div>

                        <!-- To Date -->
                        <div>
                            <label for="to_date"
                                class="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                To Date
                                <i class="fa fa-info-circle text-gray-400 cursor-pointer hover:text-gray-600"
                                    title="Leave empty if this is your current role"></i>
                            </label>
                            <input type="date" id="to_date" v-model="experience.to_date"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300" />
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label for="description"
                            class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="description" v-model="experience.description" rows="3"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"></textarea>
                    </div>

                    <!-- Submit -->
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
                        shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                        {{ isEditing ? "Update Experience" : "Add Experience" }}
                    </button>
                </form>
            </div>
        </div>

        <!-- List -->
        <div class="w-full lg:w-1/2 max-w-xlg mx-10 p-6 bg-white shadow-xl rounded-lg">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">Experience List</h2>
                <button v-if="isEditing" @click="addExperienceButton"
                    class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">
                    Add Experience
                </button>
            </div>


            <ul class="mt-6 divide-y divide-gray-200">
                <li v-for="(exp, index) in experiences" :key="exp.id" class="py-3 flex justify-between items-center">
                    <div>
                        <p class="font-semibold text-gray-800">
                            {{ index + 1 }}. {{ exp.title }} | {{ exp.location }}
                        </p>
                        <p class="text-sm text-gray-500">
                            {{ exp.company }} • {{ $common.formatDate(exp.from_date) }} -
                            {{ exp.to_date ? $common.formatDate(exp.to_date) : "Present" }}
                        </p>
                        <p class="text-sm text-gray-500">{{ exp.description }}</p>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3">
                        <button @click="editExperience(exp)"
                            class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition">
                            <i class="fas fa-pen"></i> 
                        </button>
                        <button @click="deleteExperience(exp.id)"
                            class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition">
                          <i class="fa fa-trash"></i>  
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import experienceService from '../../services/experienceService';

export default {
    data() {
        return {
            experience: {
                id: null,
                title: '',
                company: '',
                location: '',
                from_date: '',
                to_date: '',
                order_no: '',
                description: '',
            },
            experiences: [],
            isEditing: false,
        };
    },
    methods: {
        async addExperience() {
            try {
                await experienceService.add(this.experience);
                await this.loadExperiences();
                this.resetForm();
            } catch (error) {
                console.error("Error adding experience:", error);
            }
        },
        addExperienceButton() {
            this.resetForm();
            this.isEditing = false;
        },
        editExperience(exp) {
            const formatDate = (date) => {
                if (!date) return '';
                // Ensure correct day without timezone shift
                const d = new Date(date);
                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            };

            this.experience = {
                ...exp,
                from_date: formatDate(exp.from_date),
                to_date: formatDate(exp.to_date),
            };

            this.isEditing = true;
        },
        async updateExperience() {
            if (!this.experience.id) return;
            try {
                await experienceService.update(this.experience.id, this.experience);
                await this.loadExperiences();
                this.resetForm();
                this.isEditing = false;
            } catch (error) {
                console.error("Error updating experience:", error);
            }
        },
        async deleteExperience(id) {
            if (confirm("Are you sure you want to delete this experience?")) {
                await experienceService.delete(id);
                this.experiences = this.experiences.filter(exp => exp.id !== id);
            }
        },
        async loadExperiences() {
            try {
                const data = await experienceService.getAll();
                this.experiences = data.data;
            } catch (error) {
                console.error("Error loading experiences:", error);
            }
        },
        resetForm() {
            this.experience = {
                id: null,
                title: '',
                company: '',
                location: '',
                from_date: '',
                to_date: '',
                order_no: '',
                description: '',
            };
            this.isEditing = false;
        }
    },
    async mounted() {
        try {
            await this.loadExperiences();
        } catch (error) {
            
        }
    }
};
</script>
