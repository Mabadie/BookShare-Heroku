# Generated by Django 2.1 on 2018-08-23 01:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('author', models.TextField()),
                ('year', models.IntegerField(default=False)),
                ('aviable', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ('title',),
            },
        ),
    ]
