import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useInputClick from '@/containers/post/write/hooks/useInputClick';
import useProjects from '@/containers/post/write/hooks/useProjects';
import { cn } from '@/utils/cn';

const ProjectSetting = () => {
  const {
    projectList,
    handleAddProject,
    handleChageProjectName,
    projectName,
    handleSelectProject,
    selectedProject,
  } = useProjects();
  const { inputRef, isInputActive, handleInputClick } = useInputClick();

  return (
    <>
      <Button size="md" outline>
        프로젝트 {selectedProject?.name ? `: ${selectedProject.name}` : ''}
      </Button>
      <div className="flex flex-col gap-2">
        <div
          className="flex flex-col gap-2"
          ref={inputRef}
          onClick={handleInputClick}
        >
          <Input
            label="프로젝트 이름"
            name="projectName"
            placeholder="새로운 프로젝트를 입력하세요"
            onChange={handleChageProjectName}
            value={projectName}
          />
          {selectedProject && (
            <input type="hidden" name="projectId" value={selectedProject.id} />
          )}
          {isInputActive && (
            <div className="flex justify-end gap-2">
              <Button outline>취소</Button>
              <Button onClick={() => handleAddProject(projectName)}>
                프로젝트 추가
              </Button>
            </div>
          )}
        </div>
        <ul className="h-40 overflow-y-auto">
          {projectList.map((project) => (
            <li
              key={project.id}
              onClick={() => handleSelectProject(project)}
              className={cn(
                `p-2`,
                ` ${selectedProject?.id === project.id && 'bg-sky-600 dark:bg-orange-600'} `,
              )}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectSetting;
