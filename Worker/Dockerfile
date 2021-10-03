FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
WORKDIR /app

# copy project and restore as distinct layers
COPY . .
WORKDIR /app/src/Worker.Application
RUN dotnet restore && dotnet publish -c Release -o dist

# final stage/image
FROM mcr.microsoft.com/dotnet/runtime:3.1
WORKDIR /app/dist
COPY --from=build-env /app/src/Worker.Application/dist .

# EXPOSE 5000

ENTRYPOINT ["dotnet", "Worker.Application.dll"]

# docker build -t worker .
# docker run --name workertest worker:latest