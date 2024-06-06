// import { DisciplinaProps } from '@/entities/interfaces/discipline';
// import { sanatizeFilters } from '@/services/helpers/sanatizeFilters';
import {api} from '../api';
import {AxiosResponse} from "axios";
import {OutcomeResponseDTO, Page} from "@/entities/money-planner-api";

interface ListDisciplinesProps {
    page: number;
    size: number;
    filters?: FiltersProps | [];
}

interface FiltersProps {
    name?: string;
    type?: string;
    date?: string;
    sort?: string;
}

// export const getDiscipline = async (id: number) => {
//   const response = await api.get(`/disciplina/${id}`);
//   return await response.data;
// };
// export const listAllDisciplineTypes = async () => {
//   const response = await api.get('/tipo-disciplina/list');
//   return await response.data;
// };
// export const listAllDisciplines = async () => {
//   const response = await api.get('/disciplina/list');
//   return await response.data;
// };
//
// export const countDisciplines = async () => {
//   const response = await api.get('/disciplina/count');
//   return await response.data;
// };

export const getPageableOutcomes = async ({
                                              page = 1,
                                              size = 10,
                                              filters = [],
                                          }: ListDisciplinesProps) => {
    const params = {
        page,
        size,
    };
    // const sanatizedParams = sanatizeFilters({ filters, params });
    // const response = await api.get('/disciplina', {
    //   params: sanatizedParams,
    // });
    const response: AxiosResponse<Page<OutcomeResponseDTO>> = await api.get('/outcome/pageable', {
        params: params
    });

    return response.data;

    // const sanatizedData = response.data.content.map((discipline: DisciplinaProps) => {
    //   return {
    //     id: discipline.id,
    //     name: discipline.nome,
    //     code: discipline.codigo,
    //     turma: discipline.turma.nome,
    //   };
    // });
    // return { list: sanatizedData, totalElements: response.data.totalElements };
};

// export const updateDiscipline = async (id: number, data: DisciplinaProps) => {
//   const response = await api.patch(`/disciplina/${id}`, data);
//   return response.data;
// };
//
// export const createDiscipline = async (data: any) => {
//   const response = await api.post('/disciplina', {
//     nome: data.nome,
//     codigo: data.codigo,
//     turmaId: Number(data.turma),
//     tipoDisciplinaId: Number(data.tipoDisciplina),
//   });
//
//   return response.data;
// };
// export const deleteDiscipline = async (id: number) => {
//   await api.delete(`/disciplina/${id}`);
//   ('disciplina excluida');
//   return;
// };
