'use server';

import { revalidatePath } from 'next/cache';

export async function editPostAction(id: string) {
  revalidatePath(`/posts/${id}/edit`);
}
