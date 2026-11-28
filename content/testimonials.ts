// REAL testimonials only, with the client's permission. The section stays hidden while both lists are empty.

export type VideoTestimonial = { name: string; role: string; company: string; poster: string; src: string };
export type TextTestimonial = { quote: string; name: string; role: string; company: string; photo?: string };

export const videoTestimonials: VideoTestimonial[] = [];

export const textTestimonials: TextTestimonial[] = [];
