import { EntitySchema } from 'typeorm'
import { ApIdSchema, BaseColumnSchemaPart } from '../../helper/base-entity'
import { Flow, FlowRun, Project } from '@activepieces/shared'

type FlowRunSchema = FlowRun & {
    project: Project
    flow: Flow
}

export const FlowRunEntity = new EntitySchema<FlowRunSchema>({
    name: 'flow_run',
    columns: {
        ...BaseColumnSchemaPart,
        projectId: ApIdSchema,
        flowId: ApIdSchema,
        flowVersionId: ApIdSchema,
        environment: {
            type: String,
            nullable: true,
        },
        flowDisplayName: {
            type: String,
        },
        logsFileId: { ...ApIdSchema, nullable: true },
        status: {
            type: String,
        },
        startTime: {
            type: 'timestamp with time zone',
        },
        finishTime: {
            nullable: true,
            type: 'timestamp with time zone',
        },
    },
    indices: [
        {
            name: 'idx_run_project_id',
            columns: ['projectId'],
            unique: false,
        },
    ],
    relations: {
        project: {
            type: 'many-to-one',
            target: 'project',
            cascade: true,
            onDelete: 'CASCADE',
            joinColumn: {
                name: 'projectId',
                foreignKeyConstraintName: 'fk_flow_run_project_id',
            },
        },
        flow: {
            type: 'many-to-one',
            target: 'flow',
            cascade: true,
            onDelete: 'CASCADE',
            joinColumn: {
                name: 'flowId',
                foreignKeyConstraintName: 'fk_flow_run_flow_id',
            },
        },
    },
})
